import { HttpPostClientSpy } from 'data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from '@faker-js/faker'
import { mockAuthentication } from 'domain/test/mock-authentication'

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
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut()

    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call httpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })
})
