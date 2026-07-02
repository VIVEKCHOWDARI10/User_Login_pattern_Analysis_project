from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.hash import bcrypt

from database import SessionLocal
from models import (
    User,
    UserLoginLog,
    RoleMaster,
    UserRoleMapping,
    MenuMaster,
    RoleMenuMapping
)

app = FastAPI()

app.add_middleware(  
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}


@app.post("/login")
async def login(
    login_data: LoginRequest,
    request: Request
):
    
    db: Session = SessionLocal()

    try:

        user = db.query(User).filter(
            User.username == login_data.username
        ).first()

        if not user or not bcrypt.verify(
            login_data.password,
            user.password_hash
        ):

            failed_log = UserLoginLog(
                username=login_data.username,
                ip_address=request.client.host,
                login_location="Unknown",
                device={
                    "browser": "Chrome",
                    "os": "Windows"
                },
                status="FAILED"
            )

            db.add(failed_log)
            db.commit()

            raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
            )

        success_log = UserLoginLog(
            username=user.username,
            ip_address=request.client.host,
            login_location="India",
            device={
                "browser": "Chrome",
                "os": "Windows"
            },
            status="SUCCESS"
        )

        db.add(success_log)
        db.commit()

        return {
            "status": "success",
            "message": "Login successful"
        }
    except Exception as e:
        print("ERROR:", e)
        raise
    finally:
        db.close()


@app.get("/user-role/{user_id}")
def get_user_role(user_id: int):

    db: Session = SessionLocal()

    try:

        mapping = db.query(
            UserRoleMapping
        ).filter(
            UserRoleMapping.user_id == user_id
        ).first()

        if not mapping:
            raise HTTPException(
                status_code=404,
                detail="Role mapping not found"
            )

        role = db.query(
            RoleMaster
        ).filter(
            RoleMaster.role_id == mapping.role_id
        ).first()

        if not role:
            raise HTTPException(
                status_code=404,
                detail="Role not found"
            )

        return {
            "user_id": user_id,
            "role": role.role_name
        }

    finally:
        db.close()       
    
    
@app.get("/user-menu/{user_id}")
def get_user_menu(user_id: int):

    db: Session = SessionLocal()

    try:

        mapping = db.query(
            UserRoleMapping
        ).filter(
            UserRoleMapping.user_id == user_id
        ).first()

        if not mapping:
            raise HTTPException(
                status_code=404,
                detail="Role mapping not found"
            )

        menu_mappings = db.query(
            RoleMenuMapping
        ).filter(
            RoleMenuMapping.role_id == mapping.role_id
        ).all()

        menu_list = []

        for menu_mapping in menu_mappings:

            menu = db.query(
                MenuMaster
            ).filter(
                MenuMaster.menu_id == menu_mapping.menu_id
            ).first()

            if menu:

                menu_list.append({
                    "menu_name": menu.menu_name,
                    "route_path": menu.route_path,
                    "icon_name": menu.icon_name
                })

        return menu_list

    finally:
        db.close()    