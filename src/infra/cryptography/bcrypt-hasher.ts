import { HashComparer } from "@/core/cryptography/hash-comparer";
import { HashGenerator } from "@/core/cryptography/hash-generator";
import { compare, hash } from 'bcryptjs';
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.HASH_SALT_LENGTH)
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash)
  }

}