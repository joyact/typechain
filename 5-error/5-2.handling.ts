{
  class NetworkClient {
    tryConnect(): void {
      throw new Error('no network!');
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
