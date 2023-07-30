import { getModelByName } from '@adminjs/prisma'
import { add } from '../components.bundler.js'

const Category = {
  resource: {
    Model: getModelByName('Category'),
    options: {
      parent: {
        name: 'Category',
      },
    },
  },
  options: {
    properties: {
       categoryId: {
        // Utiliza el componente personalizado para el selector de categorías
        isVisible: { list: true, show: true, edit: true },
        position: 3,
        components: {
          edit: add('./property-types/custom-category-selector.js', 'CategorySelect'),
        },
      },
    },
  },
}

export default Category
