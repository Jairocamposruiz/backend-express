import boom from '@hapi/boom';

import { CreateCategoryDto, UpdateCategoryDto, GetCategoryDto } from '../dtos/category.dto';
import sequelize from '../../common/database/sequelize';


const categoryRepo = sequelize.models.Category;

class CategoriesService {
  async find () {
    return await categoryRepo.findAll();
  }

  async findOne (id: GetCategoryDto) {
    const category = await categoryRepo.findByPk(id, {
      include: ['products']
    });
    if (!category) throw boom.notFound('Category not found');

    return category;
  }

  async create (payload: CreateCategoryDto) {
    try {
      await categoryRepo.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async update (id: GetCategoryDto, payload: UpdateCategoryDto) {
    const category = await categoryRepo.findByPk(id);
    if (!category) throw boom.notFound('Category not found');

    return category;
  }

  async delete (id: GetCategoryDto) {
    const category = await categoryRepo.findByPk(id);
    if (!category) throw boom.notFound('Category not found');
    await category.destroy();

    return {
      id,
      message: 'Category was deleted',
    };
  }
}

export default CategoriesService;
