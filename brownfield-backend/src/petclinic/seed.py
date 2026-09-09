from datetime import datetime
from decimal import Decimal

from sqlalchemy.orm import Session

from petclinic.invoice.models import Invoice
from petclinic.pet.models import Pet
from petclinic.vet.models import Vet
from petclinic.visit.models import Visit

PETS = [
    (0, "Max", "John Smith"),
    (1, "Bella", "Sarah Johnson"),
    (2, "Charlie", "John Smith"),
    (3, "Luna", "Emily Davis"),
    (4, "Rocky", "Michael Brown"),
]

VETS = [
    (1, "Dr. Sarah Martinez", "Surgery"),
    (2, "Dr. James Chen", "Dentistry"),
    (3, "Dr. Emily Rodriguez", "General Practice"),
    (4, "Dr. Michael Thompson", "Cardiology"),
]

VISITS = [
    (1, "2025-11-15 09:30:00", "Downtown Clinic",
     "Pre-operative surgical consultation for neutering procedure. Patient examined and "
     "deemed healthy for anesthesia. Bloodwork results reviewed and within normal limits. "
     "Surgery scheduled for next week. Pre-operative fasting instructions provided to owner.",
     1, 1),
    (2, "2025-11-18 14:00:00", "North Branch",
     "Routine wellness examination. All vital signs normal. Dental cleaning performed. "
     "Owner educated about dental care at home. No concerns noted.",
     1, 3),
    (3, "2025-11-10 10:15:00", "East Side Clinic",
     "Dental examination revealed minor tartar buildup. Professional cleaning completed. "
     "Two teeth required extraction due to decay. Post-operative care instructions provided. "
     "Pain medication prescribed.",
     2, 2),
    (4, "2025-11-20 11:45:00", "Downtown Clinic",
     "Surgical consultation for mass removal. Pre-operative bloodwork ordered. Surgery "
     "scheduled for next week. Owner counseled on procedure risks and recovery expectations.",
     2, 1),
    (5, "2025-11-12 16:30:00", "North Branch",
     "Presented with lethargy and reduced appetite. Physical examination unremarkable. "
     "Bloodwork shows mild dehydration. Subcutaneous fluids administered. Dietary "
     "recommendations provided. Recheck in 3 days if symptoms persist.",
     3, 3),
    (6, "2025-11-22 08:00:00", "East Side Clinic",
     "Routine dental prophylaxis. Moderate periodontal disease noted. Full mouth radiographs "
     "taken. One molar extracted. Antibiotic therapy initiated. Home care demonstration "
     "completed with owner.",
     4, 2),
    (7, "2025-11-17 13:20:00", "Downtown Clinic",
     "Post-operative follow-up after spay surgery. Incision healing well with no signs of "
     "infection. Sutures intact. Activity restriction to continue for one more week. Recheck "
     "scheduled for suture removal.",
     4, 1),
    (8, "2025-11-21 15:00:00", "North Branch",
     "Cardiac evaluation for heart murmur detected during routine exam. Echocardiogram "
     "performed showing mild mitral valve insufficiency. No clinical signs of heart failure "
     "at this time. Monitoring recommended every 6 months. Owner educated on warning signs.",
     4, 4),
]

INVOICES = [
    (1, "INV-2025-001", "2025-11-15 09:30:00", "150.00", 1),
    (2, "INV-2025-002", "2025-11-18 14:00:00", "75.50", 2),
    (3, "INV-2025-003", "2025-11-10 10:15:00", "300.00", 3),
    (4, "INV-2025-004", "2025-11-20 11:45:00", "450.00", 4),
    (5, "INV-2025-005", "2025-11-12 16:30:00", "120.00", 5),
]


def seed(db: Session) -> None:
    for pet_id, name, owner_name in PETS:
        db.add(Pet(id=pet_id, name=name, owner_name=owner_name))

    for vet_id, name, specialty in VETS:
        db.add(Vet(id=vet_id, name=name, specialty=specialty))

    for visit_id, date_time, clinic, summary, pet_id, vet_id in VISITS:
        db.add(
            Visit(
                id=visit_id,
                date_time=datetime.fromisoformat(date_time),
                clinic=clinic,
                summary=summary,
                pet_id=pet_id,
                vet_id=vet_id,
            )
        )

    for invoice_id, invoice_number, invoice_date, amount, visit_id in INVOICES:
        db.add(
            Invoice(
                id=invoice_id,
                invoice_number=invoice_number,
                invoice_date=datetime.fromisoformat(invoice_date),
                amount=Decimal(amount),
                visit_id=visit_id,
            )
        )

    db.commit()
