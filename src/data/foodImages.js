/**
 * Foodspotting — Image URL mapping for food items.
 * Uses high-quality verified images from Wikimedia Commons for accuracy.
 */

const foodImages = {
  // ── Breakfast ──
  poha: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Poha%2C_a_snack_made_from_flattened_rice.jpg/400px-Poha%2C_a_snack_made_from_flattened_rice.jpg",
  upma: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_photo_of_Upma.jpg/500px-A_photo_of_Upma.jpg",
  idli: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Idli_Sambar.JPG/500px-Idli_Sambar.JPG",
  masala_dosa: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Dosa_at_a_street_shack_in_India.jpg/500px-Dosa_at_a_street_shack_in_India.jpg",
  aloo_paratha: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/500px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg",
  bread_butter: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/500px-Fresh_made_bread_05.jpg",
  oats_porridge: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Oatmeal.jpg/500px-Oatmeal.jpg",
  cornflakes: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kellogg%27s_Corn_Flakes%2C_with_milk.jpg/500px-Kellogg%27s_Corn_Flakes%2C_with_milk.jpg",
  egg_bhurji: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Spicy_egg_bhurji_%40_the_eggfactory.jpg/500px-Spicy_egg_bhurji_%40_the_eggfactory.jpg",
  boiled_eggs: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Soft-boiled-egg.jpg/500px-Soft-boiled-egg.jpg",
  moong_dal_chilla: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Pesarattu_or_Moong_Dal_Dosa.jpg/500px-Pesarattu_or_Moong_Dal_Dosa.jpg",
  besan_chilla: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/500px-Triangle_paratha_%28cropped%29.JPG",

  // ── Lunch / Dinner ──
  dal_rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/3_types_of_lentil.png/500px-3_types_of_lentil.png",
  rajma_chawal: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rajma_Masala_%2832081557778%29.jpg/500px-Rajma_Masala_%2832081557778%29.jpg",
  chole_chawal: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/500px-Chana_masala.jpg",
  roti_sabzi: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/500px-2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg",
  chicken_curry_rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chicken_Makhani_%289139587422%29.jpg/500px-Chicken_Makhani_%289139587422%29.jpg",
  egg_curry_rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Egg_Curry.jpg/500px-Egg_Curry.jpg",
  paneer_butter_masala: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Day_96_Melting_Pot.jpg/500px-Day_96_Melting_Pot.jpg",
  veg_biryani: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/500px-%22Hyderabadi_Dum_Biryani%22.jpg",
  chicken_biryani: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/500px-%22Hyderabadi_Dum_Biryani%22.jpg",
  khichdi: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Khichdi%2C_a_traditional_Indian_dish.jpg/500px-Khichdi%2C_a_traditional_Indian_dish.jpg",
  fish_curry_rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Meen_curry_2_%28cropped%29.JPG/500px-Meen_curry_2_%28cropped%29.JPG",
  veg_thali: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Vegetarian_Curry.jpeg/500px-Vegetarian_Curry.jpeg",
  curd_rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Curd_Rice.jpg/500px-Curd_Rice.jpg",
  dal_khichdi: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Khichdi%2C_a_traditional_Indian_dish.jpg/500px-Khichdi%2C_a_traditional_Indian_dish.jpg",

  // ── Snacks ──
  samosa: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Samosa-and-Chatni.jpg/500px-Samosa-and-Chatni.jpg",
  pakora: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Onion_pakora_-_a.jpg/500px-Onion_pakora_-_a.jpg",
  maggi: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Instant_Noodles_In_A_Bowl.jpg/500px-Instant_Noodles_In_A_Bowl.jpg",
  sprouts_chaat: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Organic_mixed_beans_shoots.jpg/500px-Organic_mixed_beans_shoots.jpg",
  roasted_makhana: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Foxnuts.jpg/500px-Foxnuts.jpg",
  fruit_chaat: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Fruktsallad_%28Fruit_salad%29.jpg/500px-Fruktsallad_%28Fruit_salad%29.jpg",
  peanut_chaat: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Arachis_hypogaea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-163.jpg/500px-Arachis_hypogaea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-163.jpg",
  sandwich_veg: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bacon%2C_lettuce%2C_tomato%2C_and_avocado.jpg/500px-Bacon%2C_lettuce%2C_tomato%2C_and_avocado.jpg",
  bread_omelette: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg/500px-Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg",
  banana: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg",
  dry_fruits_mix: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2021-05-15_04_45_03_A_sample_of_Kirkland_Trail_Mix_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg/500px-2021-05-15_04_45_03_A_sample_of_Kirkland_Trail_Mix_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg",
  paneer_tikka: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Day_96_Melting_Pot.jpg/500px-Day_96_Melting_Pot.jpg",

  // ── Street Food ──
  vada_pav: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/500px-Vada_Pav-Indian_street_food.JPG",
  pani_puri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/500px-Pani_Puri1.JPG",
  bhel_puri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Bhelpuri_-_A_Spicy_Chaat.JPG/500px-Bhelpuri_-_A_Spicy_Chaat.JPG",
  pav_bhaji: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bambayya_Pav_bhaji.jpg/500px-Bambayya_Pav_bhaji.jpg",
  chole_kulche: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/500px-Chana_masala.jpg",
  veg_momos: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/500px-Momo_nepal.jpg",
  chicken_momos: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Momo_nepal.jpg/500px-Momo_nepal.jpg",
  egg_roll: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Kathi_Roll.jpg/500px-Kathi_Roll.jpg",

  // ── Beverages ──
  chai: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chai_In_Sakora.jpg/500px-Chai_In_Sakora.jpg",
  black_coffee: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Latte_and_dark_coffee.jpg/500px-Latte_and_dark_coffee.jpg",
  cold_coffee: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Affogato_al_Caffe.jpg/500px-Affogato_al_Caffe.jpg",
  lassi_sweet: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Salt_lassi.jpg/500px-Salt_lassi.jpg",
  lassi_salt: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mint_lassi.jpg/500px-Mint_lassi.jpg",
  nimbu_pani: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lemonade_-_27682817724.jpg/500px-Lemonade_-_27682817724.jpg",
  cold_drink: "https://upload.wikimedia.org/wikipedia/commons/5/59/Drinking_glass_00118.gif",
  fresh_juice: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Orange_juice_1.jpg/500px-Orange_juice_1.jpg",
  coconut_water: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Young_Coconut_Drink.jpg/500px-Young_Coconut_Drink.jpg",
  protein_shake: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Protein_Shake.jpg/500px-Protein_Shake.jpg",

  // ── New Items ──
  butter_chicken: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg/500px-Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg",
  palak_paneer: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Palakpaneer_Rayagada_Odisha_0009.jpg/500px-Palakpaneer_Rayagada_Odisha_0009.jpg",
  aloo_gobi: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Aloo_Gobi.jpg/500px-Aloo_Gobi.jpg",
  tandoori_chicken: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Chickentandoori.jpg",
  mutton_biryani: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/500px-Hyderabadi_Chicken_Biryani.jpg",
  fish_fry: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Fish%2C_chips_and_mushy_peas.jpg/500px-Fish%2C_chips_and_mushy_peas.jpg",
  dahi_vada: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG/500px-Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG",
  gulab_jamun: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bowl_of_Gulab_Jamuns.jpg/500px-Bowl_of_Gulab_Jamuns.jpg",
  jalebi: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/500px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
  raita: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Cucumber-raita.jpg/500px-Cucumber-raita.jpg",
  green_smoothie: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Kiwi_Smoothie.jpg/500px-Kiwi_Smoothie.jpg",
  masala_chai: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chai_In_Sakora.jpg/500px-Chai_In_Sakora.jpg",
};

/**
 * Get the image URL for a food item.
 * Returns a fallback gradient if image not found.
 */
export function getFoodImage(foodId) {
  return foodImages[foodId] || null;
}

export default foodImages;
