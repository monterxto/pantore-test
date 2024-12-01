import request from 'supertest';
import {
  APP_URL,
  TESTER_EMAIL,
  TESTER_PASSWORD
} from '../utils/constants';

describe('Auth Module', () => {
  const app = APP_URL;
  const newUserName = `Tester${Date.now()}`;
  const newUserEmail = `User.${Date.now()}@pantore.com`;
  const newUserPassword = `secret`;

  describe('Registration', () => {
    it('should fail with exists email: /api/v1/auth/register (POST)', () => {
      return request(app)
        .post('/api/v1/auth/register')
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          name: 'Tester',
        })
        .expect(422)
        .expect(({ body }) => {
          expect(body.errors.email).toBeDefined();
        });
    });

    it('should successfully: /api/v1/auth/register (POST)', async () => {
      return request(app)
        .post('/api/v1/auth/register')
        .send({
          email: newUserEmail,
          password: newUserPassword,
          name: newUserName
        })
        .expect(204);
    });

    describe('Login', () => {
      it('should successfully: /api/v1/auth/login (POST)', () => {
        return request(app)
          .post('/api/v1/auth/login')
          .send({ email: newUserEmail, password: newUserPassword })
          .expect(200)
          .expect(({ body }) => {
            expect(body.token).toBeDefined();
          });
      });
    });
  });
});
