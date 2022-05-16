import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'
import { UnexpectedError } from '@/domain/erros/unexpected-error'
import { AuthenticationParams } from '@/domain/usescases/authentication/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest:
      case HttpStatusCode.notFound:
      case HttpStatusCode.serverError: throw new UnexpectedError()
      default: return await Promise.resolve()
    }
  }
}
