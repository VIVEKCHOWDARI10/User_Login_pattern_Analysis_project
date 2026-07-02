from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    TIMESTAMP,
    ForeignKey
)
from sqlalchemy.dialects.postgresql import INET, JSONB
from sqlalchemy.sql import func

from database import Base


class User(Base):
    __tablename__ = "users"

    uid = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)


class UserLoginLog(Base):
    __tablename__ = "user_login_logs"

    log_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100))
    login_time = Column(TIMESTAMP, server_default=func.now())
    ip_address = Column(INET)
    login_location = Column(String(100))
    device = Column(JSONB)
    status = Column(String(20))
    
class RoleMaster(Base):

    __tablename__ = "role_master"

    role_id = Column(Integer, primary_key=True)

    role_name = Column(String(50))

    description = Column(String(255))

    is_active = Column(Boolean)
    
class UserRoleMapping(Base):

    __tablename__ = "user_role_mapping"

    mapping_id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.uid")
    )

    role_id = Column(
        Integer,
        ForeignKey("role_master.role_id")
    )
    
class MenuMaster(Base):

    __tablename__ = "menu_master"

    menu_id = Column(Integer, primary_key=True)

    menu_name = Column(String(100))

    route_path = Column(String(100))

    icon_name = Column(String(50))

    is_active = Column(Boolean)
    

class RoleMenuMapping(Base):

    __tablename__ = "role_menu_mapping"

    id = Column(Integer, primary_key=True)

    role_id = Column(
        Integer,
        ForeignKey("role_master.role_id")
    )

    menu_id = Column(
        Integer,
        ForeignKey("menu_master.menu_id")
    )            