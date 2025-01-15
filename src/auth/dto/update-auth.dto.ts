import { PartialType } from '@nestjs/mapped-types';
import { SignUpOwnerDto } from './create-authOwner.dto';

export class UpdateAuthDto extends PartialType(SignUpOwnerDto) {}
