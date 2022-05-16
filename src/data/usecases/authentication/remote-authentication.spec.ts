import { HttpPostClientSpy } from 'data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
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
