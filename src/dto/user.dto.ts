export class RegisterAccountDTO {
  user_name: string;
  user_email: string;
  user_phone_number: string;
  user_password: string;
}

export class UpdateProfileDTO {
  user_name: string;
  user_email: string;
  user_phone_number: string;
  user_photo_profile: string;
  user_birth_date: Date;
  user_gender: 'M | F';
  updatedAt: Date;
}

export class UpdatePasswordDTO {
  user_password: string;
  new_password: string;
}

export class LoginUserDTO {
  user_email: string;
  user_password: string;
}