{
  /*
   * Discriminated Union
   * 각 state에 공통 property를 주어 좀 더 직관적인 코드를 작성할 수 있다.
   */

  //  function: login -> success, fail
  type SuccessState = {
    result: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    result: 'fail';
    reason: string;
  };

  type LoginState = SuccessState | FailState;

  function login2(): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in!',
      },
    };
  }

  // printLoginState (state: LoginState)`
  // success -> 🎉 body
  // fail -> 😭 reason
  function printLoginState2(state: LoginState) {
    if (state.result === 'success') {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}
