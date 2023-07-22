import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const encryptionKey = jose.base64url.decode(process.env.AUTH_KEY);

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

export const encryptToken = async(token: string) => {
	return new jose.EncryptJWT({ token })
		.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
		.setIssuedAt()
		.encrypt(encryptionKey);
};

export const decryptToken = async(token: any) => {
	return jose.jwtDecrypt(token, encryptionKey);
};

export const generateToken = async(payload: any) => {
	const token = await signToken(payload);
	const encryptedToken = await encryptToken(token);
	return encryptedToken;
};

export const decryptAndVerifyToken = async(encryptedToken: any) => {
	const { payload : { token } } = await decryptToken(encryptedToken);
	const verifiedToken = await verifyToken(token as string);
	return verifiedToken;
};