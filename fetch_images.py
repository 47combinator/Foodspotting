import urllib.request
import urllib.parse
import json

foods = [
  "Poha (food)", "Upma", "Idli", "Dosa", "Aloo paratha", "Sliced bread", "Oatmeal", "Corn flakes",
  "Egg bhurji", "Boiled egg", "Dal", "Rajma", "Chana masala", "Roti", "Chicken curry", "Paneer tikka masala",
  "Biryani", "Khichdi", "Malabar matthi curry", "Thali", "Curd rice", "Samosa", "Pakora", "Instant noodle",
  "Sprouting", "Makhana", "Fruit salad", "Peanut", "Sandwich", "Omelette", "Banana",
  "Trail mix", "Vada pav", "Panipuri", "Bhelpuri", "Pav bhaji", "Momo (food)", "Masala chai",
  "Coffee", "Iced coffee", "Lassi", "Chaas", "Lemonade", "Carbonated water", "Juice",
  "Coconut water", "Bodybuilding supplement", "Butter chicken", "Palak paneer", "Aloo gobi", "Tandoori chicken",
  "Hyderabadi biryani", "Fried fish", "Dahi vada", "Gulab jamun", "Jalebi", "Raita", "Smoothie", "Paratha", "Kathi roll"
]

results = {}

for food in foods:
    query = urllib.parse.quote(food)
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={query}&prop=pageimages&format=json&pithumbsize=400"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'FoodspottingApp/1.0 (test@example.com)'})
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read())
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                results[food] = pages[page_id]['thumbnail']['source']
                break
    except Exception as e:
        print(f"Failed for {food}: {e}")

with open("fetched_images_utf8.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)
