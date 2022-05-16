import { HttpPostClient } from './protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('Remote Authentication', () => {
  test('Should call httpPostClient with correct URL', async () => {
    class HttpClientSpy implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
      }
    }

    const url = ''
    const httpPostClientSpy = new HttpClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
