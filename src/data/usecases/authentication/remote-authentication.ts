import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/erros'
import { UnexpectedError } from '@/domain/erros/unexpected-error'
import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usescases/authentication/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as AccountModel
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest:
      case HttpStatusCode.notFound:
      case HttpStatusCode.serverError: throw new UnexpectedError()
      default: throw new UnexpectedError()
    }
  }
}
