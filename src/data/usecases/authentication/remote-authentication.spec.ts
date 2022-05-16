import { HttpPostClientSpy } from 'data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = '...'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  return {
    sut: new RemoteAuthentication(url, httpPostClientSpy),
    httpPostClientSpy
  }
}

describe('Remote Authentication', () => {
  test('Should call httpPostClient with correct URL', async () => {
    const url = 'other'
    const { sut, httpPostClientSpy } = makeSut()

    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
