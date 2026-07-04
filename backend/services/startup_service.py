from models.startup import Startup


# Save startup with AI reports
def save_startup(db, data, reports):

    startup = Startup(
        title=data.title,
        idea=data.idea,
        industry=data.industry,
        user_id=data.user_id,

        ceo_report=reports["ceo_report"],
        market_report=reports["market_report"],
        finance_report=reports["finance_report"],
        marketing_report=reports["marketing_report"],
        tech_report=reports["tech_report"],

        status="Completed"
    )

    db.add(startup)
    db.commit()
    db.refresh(startup)

    return startup


# Get all startups of a user
def get_user_startups(db, user_id):

    return (
        db.query(Startup)
        .filter(Startup.user_id == user_id)
        .order_by(Startup.id.desc())
        .all()
    )


# Get startup by ID
def get_startup_by_id(db, startup_id):

    return (
        db.query(Startup)
        .filter(Startup.id == startup_id)
        .first()
    )


# Delete startup
def delete_startup(db, startup_id):

    startup = (
        db.query(Startup)
        .filter(Startup.id == startup_id)
        .first()
    )

    if startup is None:
        return None

    db.delete(startup)
    db.commit()

    return startup