import { PrismaClient, Prisma, User } from '@prisma/client';
import { omit } from 'lodash';
import config from 'config';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';

export const excludedFields = ['password', 'verified', 'verificationCode'];

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput) => {
<<<<<<< HEAD
  return await prisma.user.create({
    data: input,
  });
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect
) => {
  return await prisma.user.update({
    where,
    select,
    data,
  });
};

export const findUser = async (where?: Prisma.UserWhereInput) => {
  return await prisma.user.findFirst({ where });
=======
  return (await prisma.user.create({
    data: input,
  })) as User;
>>>>>>> jwt_auth_verify_email
};

export const findUser = async (
  where: Partial<Prisma.UserCreateInput>,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};

export const updateUser = async (
  where: Partial<Prisma.UserCreateInput>,
  data: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.update({ where, data, select })) as User;
};

export const signTokens = async (user: Prisma.UserCreateInput) => {
  // 1. Create Session
  redisClient.set(`${user.id}`, JSON.stringify(user), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};