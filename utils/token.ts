import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export const verifyToken = async(token: string) => {
	try {
		return jose.jwtVerify(token, secret);
	} catch (err) {
		return null;
	}
};

export const signToken = async(payload: any) => {
	return new jose.SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.sign(secret);
};