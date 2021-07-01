interface State {
  name: string,
  count: number
}


export const state = () => ({
  count: 0
} as State)

export const mutations = {
  changeCount (state: State, count: number) {
    state.count = count
  }
}
