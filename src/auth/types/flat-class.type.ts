interface ClassWithUser {
  user: {
    id: number
  }
}

export type FlatClass<T extends ClassWithUser> = T & {
  "user.id": T['user']['id']
}