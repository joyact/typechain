{
  type NetworkErrorState = {
    result: 'fail';
    reason: 'offline' | 'down' | 'timeout';
  };

  type SuccessState = {
    result: 'success';
  };

  type ResultState = SuccessState | NetworkErrorState;

  class NetworkClient {
    // 예상 가능한 에러는 타입 state로 만들어 정의
    tryConnect(): ResultState {
      return;
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      this.client.tryConnect();
      // login...
    }
  }

  class App {
    constructor(private userService: UserService) {}

    run() {
      // 에러 발생 시 에러처리를 좀 더 효율적으로 다룰 수 있는 곳에서 try&catch 한다
      // TypeScript에서 구현된 catch()에는 어떠한 타입정보도 전달되지 않아서 instanceOf를 사용할 수 없다
      try {
        this.userService.login();
      } catch (error) {
        // show dialog to user
        console.log('catched!!');
      }
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
