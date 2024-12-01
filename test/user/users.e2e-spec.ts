import {
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD
} from '../utils/constants';
import request from 'supertest';
import { RoleEnum } from '../../src/roles/roles.enum';

describe('Users Module', () => {
  const app = APP_URL;
  const newUserEmail = `User.${Date.now()}@pantore.com`;
  const newUserPassword = `secret`;

  it('should update profile successfully: /api/v1/users/me (PATCH)', async () => {
    const newUserNewName = Date.now();
    const newUserNewPassword = 'new-secret';

    await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: newUserEmail,
        password: newUserPassword,
        name: `Pantore${Date.now()}`
      });
    const newUserApiToken = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.token);

    await request(app)
      .patch('/api/v1/users/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({
        name: newUserNewName,
        password: newUserNewPassword,
      })
      .expect(200);

    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: newUserEmail, password: newUserNewPassword })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });

    await request(app)
      .patch('/api/v1/users/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({ password: newUserPassword })
      .expect(200);
  });

  it('should delete profile successfully: /api/v1/users/me (DELETE)', async () => {
    const newUserApiToken = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.token);

    await request(app)
      .delete('/api/v1/users/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(422);
  });
});
