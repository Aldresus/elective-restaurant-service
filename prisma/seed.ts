import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  let pastaDellamama = await prisma.restaurant.create({
    data: {
      name: 'Pasta Dellamama',
      food_type: 'Pasta',
      address: '123 Main St',
      city: 'New York',
      postal_code: '10001',
      price_range: '10-20',
      banner_url: 'https://picsum.photos/200',
      business_hours: 'Mon-Fri 10am-6pm',
      email: 'alice@example.com',
      siret: '123456789',
    },
  });

  const pastaAlfredi = await prisma.product.create({
    data: {
      name: 'Pasta Alfredo',
      price: 10.0,
      description: 'Pate au parmesan et beurre, delicioso !',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaCarbonara = await prisma.product.create({
    data: {
      name: 'Pasta Carbonara',
      price: 10.0,
      description: 'Pate au grano padano, oeuf et pancetta, delicioso !',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaAllaCalabrese = await prisma.product.create({
    data: {
      name: 'Pasta Alla Calabrese',
      price: 10.0,
      description: 'Pate au tomate, pommes de terre et parmesan, delicioso !',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaDellamamaCoca = await prisma.product.create({
    data: {
      name: 'Coca',
      price: 10.0,
      description: 'Coca bien frais chacal',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaDellamamaLimonade = await prisma.product.create({
    data: {
      name: 'Limonade',
      price: 10.0,
      description: 'Limonade chacal',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaDellamamaBiere = await prisma.product.create({
    data: {
      name: 'Biere',
      price: 10.0,
      description: 'Biere chacal',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaDellamamaBeurreDoux = await prisma.product.create({
    data: {
      name: 'Beurre doux',
      price: 10.0,
      description: 'Beurre bien doux chacal',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaDellamamaBeurreDemiSel = await prisma.product.create({
    data: {
      name: 'Beurre demi sel',
      price: 10.0,
      description: 'Beurre demi sel chacal',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
    },
  });

  const pastaDellamamaMenu = await prisma.menu.create({
    data: {
      name: 'Pasta Dellamama',
      price: 10.0,
      description: 'Formule pate, boisson et beurre, delicioso !',
      menu_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: pastaDellamama.id_restaurant },
      },
      Menu_Categories: {
        create: [
          {
            name: 'Pates',
            Product: {
              connect: [
                {
                  id_product: pastaAlfredi.id_product,
                },
                {
                  id_product: pastaCarbonara.id_product,
                },
                {
                  id_product: pastaAllaCalabrese.id_product,
                },
              ],
            },
          },
          {
            name: 'Drinks',
            Product: {
              connect: [
                {
                  id_product: pastaDellamamaCoca.id_product,
                },
                {
                  id_product: pastaDellamamaLimonade.id_product,
                },
                {
                  id_product: pastaDellamamaBiere.id_product,
                },
              ],
            },
          },
          {
            name: 'Beurre',
            Product: {
              connect: [
                {
                  id_product: pastaDellamamaBeurreDoux.id_product,
                },
                {
                  id_product: pastaDellamamaBeurreDemiSel.id_product,
                },
              ],
            },
          },
        ],
      },
    },
  });

  pastaDellamama = await prisma.restaurant.update({
    where: { id_restaurant: pastaDellamama.id_restaurant },
    data: {
      Restaurant_Categories: {
        create: [
          {
            name: 'Nos top pates',
            Products: {
              connect: [
                {
                  id_product: pastaAlfredi.id_product,
                },
                {
                  id_product: pastaCarbonara.id_product,
                },
                {
                  id_product: pastaAllaCalabrese.id_product,
                },
              ],
            },
            Menus: {
              connect: [
                {
                  id_menu: pastaDellamamaMenu.id_menu,
                },
              ],
            },
          },
          {
            name: 'Drinks',
            Products: {
              connect: [
                {
                  id_product: pastaDellamamaCoca.id_product,
                },
                {
                  id_product: pastaDellamamaLimonade.id_product,
                },
                {
                  id_product: pastaDellamamaBiere.id_product,
                },
              ],
            },
          },
          {
            name: 'Beurres',
            Products: {
              connect: [
                {
                  id_product: pastaDellamamaBeurreDoux.id_product,
                },
                {
                  id_product: pastaDellamamaBeurreDemiSel.id_product,
                },
              ],
            },
          },
        ],
      },
    },
  });

  let burgerParadise = await prisma.restaurant.create({
    data: {
      name: 'Burger Paradise',
      food_type: 'Burgers',
      address: '456 Elm St',
      city: 'Los Angeles',
      postal_code: '90001',
      price_range: '8-15',
      banner_url: 'https://picsum.photos/200',
      business_hours: 'Mon-Sun 11am-10pm',
      email: 'bob@example.com',
      siret: '987654321',
    },
  });

  const classicBurger = await prisma.product.create({
    data: {
      name: 'Classic Burger',
      price: 8.0,
      description: 'Juicy beef patty with lettuce, tomato, and cheese',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: burgerParadise.id_restaurant },
      },
    },
  });

  const bbqBurger = await prisma.product.create({
    data: {
      name: 'BBQ Burger',
      price: 9.5,
      description: 'Beef patty with BBQ sauce, onion rings, and cheddar cheese',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: burgerParadise.id_restaurant },
      },
    },
  });

  const veggiBurger = await prisma.product.create({
    data: {
      name: 'Veggie Burger',
      price: 7.5,
      description: 'Plant-based patty with avocado, lettuce, and tomato',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: burgerParadise.id_restaurant },
      },
    },
  });

  const frenchFries = await prisma.product.create({
    data: {
      name: 'French Fries',
      price: 3.0,
      description: 'Crispy golden fries',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: burgerParadise.id_restaurant },
      },
    },
  });

  const onionRings = await prisma.product.create({
    data: {
      name: 'Onion Rings',
      price: 4.0,
      description: 'Breaded and fried onion rings',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: burgerParadise.id_restaurant },
      },
    },
  });

  const cola = await prisma.product.create({
    data: {
      name: 'Cola',
      price: 2.0,
      description: 'Refreshing cola drink',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: burgerParadise.id_restaurant },
      },
    },
  });

  const lemonade = await prisma.product.create({
    data: {
      name: 'Lemonade',
      price: 2.5,
      description: 'Freshly squeezed lemonade',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: {
          id_restaurant: burgerParadise.id_restaurant,
        },
      },
    },
  });

  const burgerCombo = await prisma.menu.create({
    data: {
      name: 'Burger Combo',
      price: 12.0,
      description: 'Your choice of burger with fries and a drink',
      menu_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: burgerParadise.id_restaurant },
      },
      Menu_Categories: {
        create: [
          {
            name: 'Burgers',
            Product: {
              connect: [
                {
                  id_product: classicBurger.id_product,
                },
                {
                  id_product: bbqBurger.id_product,
                },
                {
                  id_product: veggiBurger.id_product,
                },
              ],
            },
          },
          {
            name: 'Sides',
            Product: {
              connect: [
                {
                  id_product: frenchFries.id_product,
                },
              ],
            },
          },
          {
            name: 'Drinks',
            Product: {
              connect: [
                {
                  id_product: cola.id_product,
                },
                {
                  id_product: lemonade.id_product,
                },
              ],
            },
          },
        ],
      },
    },
  });

  burgerParadise = await prisma.restaurant.update({
    where: { id_restaurant: burgerParadise.id_restaurant },
    data: {
      Restaurant_Categories: {
        create: [
          {
            name: 'Burgers',
            Products: {
              connect: [
                {
                  id_product: classicBurger.id_product,
                },
                {
                  id_product: bbqBurger.id_product,
                },
                {
                  id_product: veggiBurger.id_product,
                },
              ],
            },
          },
          {
            name: 'Sides',
            Products: {
              connect: [
                {
                  id_product: frenchFries.id_product,
                },
                {
                  id_product: onionRings.id_product,
                },
              ],
            },
          },
          {
            name: 'Drinks',
            Products: {
              connect: [
                {
                  id_product: cola.id_product,
                },
                {
                  id_product: lemonade.id_product,
                },
              ],
            },
          },
          {
            name: 'Combos',
            Menus: {
              connect: [
                {
                  id_menu: burgerCombo.id_menu,
                },
              ],
            },
          },
        ],
      },
    },
  });

  let sushiHouse = await prisma.restaurant.create({
    data: {
      name: 'Sushi House',
      food_type: 'Japanese',
      address: '789 Oak St',
      city: 'San Francisco',
      postal_code: '94101',
      price_range: '15-30',
      banner_url: 'https://picsum.photos/200',
      business_hours: 'Tue-Sun 12pm-9pm',
      email: 'carol@example.com',
      siret: '456789123',
    },
  });

  const californiaRoll = await prisma.product.create({
    data: {
      name: 'California Roll',
      price: 8.0,
      description:
        'Crab, avocado, and cucumber rolled in sushi rice and seaweed',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
    },
  });

  const spicyTunaRoll = await prisma.product.create({
    data: {
      name: 'Spicy Tuna Roll',
      price: 9.0,
      description: 'Spicy tuna and cucumber rolled in sushi rice and seaweed',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
    },
  });

  const salmonNigiri = await prisma.product.create({
    data: {
      name: 'Salmon Nigiri',
      price: 7.0,
      description: 'Fresh salmon served on top of sushi rice',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
    },
  });

  const misoSoup = await prisma.product.create({
    data: {
      name: 'Miso Soup',
      price: 4.0,
      description: 'Traditional Japanese soup with miso paste and tofu',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
    },
  });

  const edamame = await prisma.product.create({
    data: {
      name: 'Edamame',
      price: 5.0,
      description: 'Steamed and salted soybeans',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
    },
  });

  const greenTea = await prisma.product.create({
    data: {
      name: 'Green Tea',
      price: 3.0,
      description: 'Refreshing Japanese green tea',
      product_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
    },
  });

  const sakeTasting = await prisma.menu.create({
    data: {
      name: 'Sake Tasting',
      price: 25.0,
      description: 'A selection of three premium Japanese sakes',
      menu_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
      Menu_Categories: {
        create: [
          {
            name: 'Sakes',
            Product: {
              create: [
                {
                  name: 'Junmai Ginjo',
                  price: 10.0,
                  description: 'Smooth and fragrant sake',
                  product_image_url: 'https://picsum.photos/200',
                  deleted: false,
                  restaurant: {
                    connect: { id_restaurant: sushiHouse.id_restaurant },
                  },
                },
                {
                  name: 'Daiginjo',
                  price: 12.0,
                  description: 'Premium sake with delicate flavors',
                  product_image_url: 'https://picsum.photos/200',
                  deleted: false,
                  restaurant: {
                    connect: { id_restaurant: sushiHouse.id_restaurant },
                  },
                },
                {
                  name: 'Nigori',
                  price: 9.0,
                  description: 'Unfiltered sake with a creamy texture',
                  product_image_url: 'https://picsum.photos/200',
                  deleted: false,
                  restaurant: {
                    connect: { id_restaurant: sushiHouse.id_restaurant },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const sushiCombo = await prisma.menu.create({
    data: {
      name: 'Sushi Combo',
      price: 18.0,
      description: 'A combination of sushi rolls and nigiri',
      menu_image_url: 'https://picsum.photos/200',
      deleted: false,
      restaurant: {
        connect: { id_restaurant: sushiHouse.id_restaurant },
      },
      Menu_Categories: {
        create: [
          {
            name: 'Sushi Rolls',
            Product: {
              connect: [
                {
                  id_product: californiaRoll.id_product,
                },
                {
                  id_product: spicyTunaRoll.id_product,
                },
              ],
            },
          },
          {
            name: 'Nigiri',
            Product: {
              connect: [
                {
                  id_product: salmonNigiri.id_product,
                },
              ],
            },
          },
        ],
      },
    },
  });

  sushiHouse = await prisma.restaurant.update({
    where: { id_restaurant: sushiHouse.id_restaurant },
    data: {
      Restaurant_Categories: {
        create: [
          {
            name: 'Sushi Rolls',
            Products: {
              connect: [
                {
                  id_product: californiaRoll.id_product,
                },
                {
                  id_product: spicyTunaRoll.id_product,
                },
              ],
            },
          },
          {
            name: 'Nigiri',
            Products: {
              connect: [
                {
                  id_product: salmonNigiri.id_product,
                },
              ],
            },
          },
          {
            name: 'Appetizers',
            Products: {
              connect: [
                {
                  id_product: misoSoup.id_product,
                },
                {
                  id_product: edamame.id_product,
                },
              ],
            },
          },
          {
            name: 'Beverages',
            Products: {
              connect: [
                {
                  id_product: greenTea.id_product,
                },
              ],
            },
          },
          {
            name: 'Combos',
            Menus: {
              connect: [
                {
                  id_menu: sushiCombo.id_menu,
                },
              ],
            },
          },
          {
            name: 'Tasting Menus',
            Menus: {
              connect: [
                {
                  id_menu: sakeTasting.id_menu,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const emptyRestaurants = await prisma.restaurant.createMany({
    data: [
      {
        name: 'Pizza Hut',
        food_type: 'Italian',
        address: '123 Main St',
        city: 'New York',
        postal_code: '10001',
        price_range: '10-20',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Fri 10am-6pm',
        email: 'restaurant1@example.com',
        siret: '123456789',
      },
      {
        name: 'Mexicut',
        food_type: 'Mexican',
        address: '456 Elm St',
        city: 'Los Angeles',
        postal_code: '90001',
        price_range: '15-30',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Tue-Sun 11am-9pm',
        email: 'restaurant2@example.com',
        siret: '987654321',
      },
      {
        name: 'Kebab',
        food_type: 'Middle Eastern',
        address: '789 Oak St',
        city: 'San Francisco',
        postal_code: '94101',
        price_range: '15-30',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Tue-Sun 12pm-9pm',
        email: 'restaurant3@example.com',
        siret: '456789123',
      },
      {
        name: 'mcdonalds',
        food_type: 'American',
        address: '123 Main St',
        city: 'New York',
        postal_code: '10001',
        price_range: '10-20',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Fri 10am-6pm',
        email: 'restaurant4@example.com',
        siret: '123456789',
      },
      {
        name: 'burgerit',
        food_type: 'Burgers',
        address: '456 Elm St',
        city: 'Los Angeles',
        postal_code: '90001',
        price_range: '8-15',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Sun 11am-10pm',
        email: 'restaurant5@example.com',
        siret: '987654321',
      },
      {
        name: 'Sushi Spot',
        food_type: 'Japanese',
        address: '321 Pine St',
        city: 'Seattle',
        postal_code: '98101',
        price_range: '20-40',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Sat 5pm-10pm',
        email: 'restaurant6@example.com',
        siret: '135792468',
      },
      {
        name: 'Pasta Palace',
        food_type: 'Italian',
        address: '654 Maple Ave',
        city: 'Chicago',
        postal_code: '60601',
        price_range: '15-30',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Tue-Sun 12pm-9pm',
        email: 'restaurant7@example.com',
        siret: '246813579',
      },
      {
        name: 'Curry House',
        food_type: 'Indian',
        address: '987 Cedar Rd',
        city: 'Houston',
        postal_code: '77001',
        price_range: '12-25',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Sun 11am-10pm',
        email: 'restaurant8@example.com',
        siret: '314159265',
      },
      {
        name: 'Pho Noodle Bar',
        food_type: 'Vietnamese',
        address: '753 Walnut St',
        city: 'Philadelphia',
        postal_code: '19101',
        price_range: '10-20',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Sat 11am-9pm',
        email: 'restaurant9@example.com',
        siret: '271828182',
      },
      {
        name: 'Greek Grill',
        food_type: 'Greek',
        address: '159 Chestnut St',
        city: 'Boston',
        postal_code: '02101',
        price_range: '15-30',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Tue-Sun 12pm-10pm',
        email: 'restaurant10@example.com',
        siret: '161803398',
      },
      {
        name: 'Taco Town',
        food_type: 'Mexican',
        address: '951 Birch Blvd',
        city: 'Miami',
        postal_code: '33101',
        price_range: '8-15',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Fri 10am-9pm',
        email: 'restaurant11@example.com',
        siret: '192837465',
      },
      {
        name: 'BBQ Barn',
        food_type: 'Barbecue',
        address: '357 Spruce Ln',
        city: 'Dallas',
        postal_code: '75201',
        price_range: '12-25',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Wed-Sun 12pm-10pm',
        email: 'restaurant12@example.com',
        siret: '239018237',
      },
      {
        name: 'Ramen Republic',
        food_type: 'Japanese',
        address: '753 Oak St',
        city: 'Portland',
        postal_code: '97201',
        price_range: '12-25',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Tue-Sun 11am-9pm',
        email: 'restaurant13@example.com',
        siret: '271828182',
      },
      {
        name: 'Falafel Factory',
        food_type: 'Middle Eastern',
        address: '951 Maple Ave',
        city: 'Denver',
        postal_code: '80201',
        price_range: '8-15',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Sat 11am-9pm',
        email: 'restaurant14@example.com',
        siret: '314159265',
      },
      {
        name: 'Dim Sum Delights',
        food_type: 'Chinese',
        address: '159 Pine St',
        city: 'San Diego',
        postal_code: '92101',
        price_range: '15-30',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Wed-Sun 10am-8pm',
        email: 'restaurant15@example.com',
        siret: '161803398',
      },
      {
        name: 'Cajun Kitchen',
        food_type: 'Cajun',
        address: '357 Cedar Rd',
        city: 'New Orleans',
        postal_code: '70112',
        price_range: '12-25',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Tue-Sat 12pm-10pm',
        email: 'restaurant16@example.com',
        siret: '192837465',
      },
      {
        name: 'Vegan Vibes',
        food_type: 'Vegan',
        address: '753 Walnut Blvd',
        city: 'Austin',
        postal_code: '78701',
        price_range: '10-20',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Mon-Fri 11am-9pm',
        email: 'restaurant17@example.com',
        siret: '239018237',
      },
      {
        name: 'Steakhouse Supreme',
        food_type: 'Steakhouse',
        address: '951 Chestnut Ln',
        city: 'Las Vegas',
        postal_code: '89101',
        price_range: '25-50',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Wed-Sun 5pm-11pm',
        email: 'restaurant18@example.com',
        siret: '271828182',
      },
      {
        name: 'Seafood Shack',
        food_type: 'Seafood',
        address: '159 Birch St',
        city: 'Miami',
        postal_code: '33101',
        price_range: '20-40',
        banner_url: 'https://picsum.photos/200',
        business_hours: 'Tue-Sun 12pm-10pm',
        email: 'restaurant19@example.com',
        siret: '314159265',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
