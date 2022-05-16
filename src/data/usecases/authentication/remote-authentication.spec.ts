import { RemoteAuthentication } from './remote-authentication'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import faker from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

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
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call httpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authParams = mockAuthentication()

    await sut.auth(authParams)

    expect(httpPostClientSpy.body).toEqual(authParams)
  })

  test('Should thorw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
