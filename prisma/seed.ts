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

  //   const alice = await prisma.restaurant.upsert({
  //     where: { id_restaurant: '1' },
  //     update: {},
  //     create: {
  //       name: 'Pasta Dellamama',
  //       food_type: 'Pasta',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       price_range: '10-20',
  //       siret: '123456789',
  //       rating: 0.0,
  //       email: 'alice@example.com',
  //       banner_url: 'https://picsum.photos/200',
  //       business_hours: 'Mon-Fri 10am-6pm',
  //       address: '123 Main St',
  //       city: 'New York',
  //       postal_code: '10001',
  //       Restaurant_Categories: {
  //         create: [
  //           {
  //             name: 'Nos top pates',
  //             Products: {
  //               create: [
  //                 {
  //                   name: 'Pasta Alfredo',
  //                   price: 10.0,
  //                   description: 'Pate au parmesan et beurre, delicioso !',
  //                   product_image_url: 'https://picsum.photos/200',
  //                   deleted: false,
  //                   restaurant: {
  //                     connect: { id_restaurant: '1' },
  //                   },
  //                 },
  //                 {
  //                     name: 'Pasta Carbonara',
  //                     price: 10.0,
  //                     description: 'Pate au grano padano, oeuf et pancetta, delicioso !',
  //                     product_image_url: 'https://picsum.photos/200',
  //                     deleted: false,
  //                     restaurant: {
  //                       connect: { id_restaurant: '1' },
  //                     },
  //                 },
  //                 {
  //                     name: 'Pasta Alla Calabrese',
  //                     price: 10.0,
  //                     description: 'Pate au tomate, pommes de terre et parmesan, delicioso !',
  //                     product_image_url: 'https://picsum.photos/200',
  //                     deleted: false,
  //                     restaurant: {
  //                       connect: { id_restaurant: '1' },
  //                     },
  //                 }
  //               ],
  //             },
  //             Menus: {
  //               create: [
  //                 {
  //                   name: 'Pasta Dellamama',
  //                   price: 10.0,
  //                   description: 'Formule pate, boisson et beurre, delicioso !',
  //                   menu_image_url: 'https://picsum.photos/200',
  //                   deleted: false,
  //                   restaurant: {
  //                     connect: { id_restaurant: '1' },
  //                   },
  //                   Menu_Categories: {
  //                     create: [
  //                       {
  //                         name:"Pates",
  //                         Product: {
  //                             connect: [{id_product: "1"}, {id_product: "2"}, {id_product: "3"}]
  //                         }
  //                       }
  //                     ]
  //                   },
  //                   createdAt: new Date(),
  //                   updatedAt: new Date(),
  //                 },
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
