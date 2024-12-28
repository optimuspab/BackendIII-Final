import sys
import json

data = json.load(sys.stdin)

premium_users = [user for user in data if user['isPremium']]
print(f"Usuarios premium: {len(premium_users)}")
