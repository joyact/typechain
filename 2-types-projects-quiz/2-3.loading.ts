{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function PrintLoginState(current: ResourceLoadState) {
    switch (current.state) {
      case 'loading':
        console.log('loading...');
        break;
      case 'success':
        console.log(`${current.response.body}`);
        break;
      case 'fail':
        console.log(`${current.reason}`);
        break;
      default:
        throw new Error(`unknown state: ${current}`);
    }
  }

  PrintLoginState({ state: 'loading' }); // 👀 loading...
  PrintLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  PrintLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
