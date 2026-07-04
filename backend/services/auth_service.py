from models.user import User
from auth.hash_password import verify_password

from auth.hash_password import hash_password


def register_user(db, user):

    # Check if email already exists
    old_user = db.query(User).filter(User.email == user.email).first()

    if old_user:
        return None

    # Create new user
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user



def login_user(db, user):
    print("Email:", user.email)
    print("Password length:", len(user.password))
    print("Password:", user.password)

    old_user = db.query(User).filter(User.email == user.email).first()
    if old_user:
        print("Stored password hash:", old_user.password)
        print("Hash length:", len(old_user.password))


    if not old_user:
        
        return None

    if not verify_password(user.password, old_user.password):
        return None

    return old_user