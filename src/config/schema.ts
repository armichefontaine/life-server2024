import { loadFiles, loadFilesSync } from '@graphql-tools/load-files'
import { createSchema } from 'graphql-yoga'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const envExtension = process.env.NODE_ENV === 'production' ? 'js' : 'ts'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
async function buildSchema() {
  const typeDefsArray = loadFilesSync(join(__dirname, '../**/*.graphql'))
  const resolversArray = await loadFiles(join(__dirname, '../**/*.resolver.' + 'js'))
  const typeDefs = mergeTypeDefs(typeDefsArray)
  const resolvers = mergeResolvers(resolversArray)
  console.log(typeDefs)

  console.log(resolvers)

  return createSchema({ typeDefs, resolvers })
}
export const schema = buildSchema()
