import models from '@database/models';
import BaseService from './base-service';

class UserService extends BaseService {
}

const { User } = models;
export default new UserService(User);
