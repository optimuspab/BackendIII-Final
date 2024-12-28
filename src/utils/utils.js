import { fakerDE as faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateProduct = () => ({
  id: faker.database.mongodbObjectId(),
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
  department: faker.commerce.department(),
  stock: faker.number.int({ min: 0, max: 100 }),
  image: faker.image.url(),
  code: faker.string.alphanumeric(10),
  description: faker.commerce.productDescription(),
});

export const generateUser = () => {
  const numOfProducts = faker.number.int({ min: 1, max: 7 });
  const products = Array.from({ length: numOfProducts }, generateProduct);

  return {
    id: faker.database.mongodbObjectId(),
    name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    sex: faker.person.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    products,
    image: faker.image.avatar(),
    email: faker.internet.email(),
    userRole: faker.helpers.arrayElement(['user', 'admin']),
    password: bcrypt.hashSync('coder123', 10),
    pets: [],
    isPremium: faker.datatype.boolean(),
    occupation: faker.person.jobTitle(),
  };
};

export const generatePet = () => ({
  id: faker.database.mongodbObjectId(),
  //type: faker.animal.type()
  type: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'fish']),
  //image: faker.image.animals(),
});

