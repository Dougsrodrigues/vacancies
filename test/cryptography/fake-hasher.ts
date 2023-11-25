import { HashComparer } from "@/infra/cryptography/hash-comparer"
import { HashGenerator } from "@/infra/cryptography/hash-generator"

export class FakeHasher implements HashGenerator, HashComparer {

  async hash(plainText: string): Promise<string> {
    return plainText.concat('-hashed')
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return plainText.concat('-hashed') === hash
  }

}