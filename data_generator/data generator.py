import os
from supabase import create_client, Client
from datetime import datetime
import random
import time
from dotenv import load_dotenv
from pathlib import Path

path =Path.joinpath(Path.cwd().parent,".env.local")

load_dotenv(
    dotenv_path=path
)


url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("SECRET_KEY")
supabase: Client = create_client(url, key)

value =0

while True:

    date_time=datetime.now().replace(microsecond=0).isoformat()

    drowsiness=random.randint(0,100)
    seat_status=random.choice([True,False])

    vitals=random.choice([True,False])
    heart_rate=random.randint(0,250)
    spo2=random.randint(0,100)
    body_temperature=round(random.uniform(0,44),1)

    enviroment=random.choice([True,False])
    ambient_temperature=round(random.uniform(-40,70),2)
    humidity=round(random.uniform(0,99),1)

    alerts=random.randint(0,2)

    tracking=random.choice([True,False])
    latitude=round(random.uniform(-90,90),6)
    longitude=round(random.uniform(-180,180),6)
    speed =random.randint(0,200)
    altitude_from_sea_level=random.randint(0,1000)


    data={

    "date_and_time":date_time,

    "drowsiness":drowsiness,
    "seat_status":seat_status,

    "vitals":vitals,
    "heart_rate":heart_rate,
    "spo2":spo2,
    "body_temperature":body_temperature,

    "environment":enviroment,
    "ambient_temperature":ambient_temperature,
    "humidity":humidity,

    "alerts":alerts,

    "tracking":tracking,
    "latitude":latitude,
    "longitude":longitude,
    "speed":speed,
    "altitude_from_sea_level":altitude_from_sea_level
    }


    response =(
        supabase.table("driver")
        .insert(data)
        .execute()
    )

    print(f'value {value} is inserted')
    value+=1
    time.sleep(0.5)




