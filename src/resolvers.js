const resolvers = {
  Query: {
    projectById (root, { projectId }, { prisma }) {
      return prisma.project({ id: projectId })
    },
    tasks (root, args, { prisma }) {
      return prisma.tasks()
    },
    projects (root, args, { prisma }) {
      return prisma.projects()
    },
    completedTasks (root, args, { prisma }) {
      return prisma.tasks({ where: { isCompleted: true } })
    }
  },
  Mutation: {
    createProject (root, { name }, { prisma }) {
      return prisma.createProject({ name })
    },
    createTask (root, { title, projectId }, { prisma }) {
      return prisma.createTask({
        title,
        project: { connect: { id: projectId } }
      })
    },
    markTaskAsCompleted (root, { taskId }, { prisma }) {
      return prisma.updateTask({
        where: { id: taskId },
        data: { isCompleted: true }
      })
    }
  },
  Project: {
    tasks (root, args, { prisma }) {
      return prisma.project({ id: root.id }).tasks()
    }
  },
  Task: {
    project (root, args, { prisma }) {
      return prisma.task({ id: root.id }).project()
    }
  }
}

module.exports = resolvers
