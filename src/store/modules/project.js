const state = {
  contarct: {}
}

const mutations = {
  SET_CONTRACT: (state, data) => {
    state.contarct = data
  }
}

const actions = {
  contarct({ commit, state }, data) {
    commit('SET_CONTRACT', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
