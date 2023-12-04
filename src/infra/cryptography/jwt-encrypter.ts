import { Encrypter } from "@/core/cryptography/encrypter";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    throw new Error("Method not implemented.");
  }
}