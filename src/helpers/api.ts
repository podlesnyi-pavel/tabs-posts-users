class Api {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  private async request({
    method,
    endpoint,
    headers = {},
    body = undefined
  }: {
    method: string;
    endpoint: string;
    body?: BodyInit;
    headers?: HeadersInit;
  }) {
    const url = `${this.baseUrl}${endpoint}`;

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      return data;
      // return response;
    } catch (error) {
      console.log(error);
    }
  }

  async get(endpoint: string): Promise<any[]> {
    return this.request({ method: 'GET', endpoint });
  }

  // async post(
  //   endpoint: string,
  //   body: BodyInit,
  //   headers?: HeadersInit
  // ): Promise<void> {
  //   return this.request('POST', endpoint, body, headers);
  // }
}

export default new Api();
