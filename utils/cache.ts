import { createClient } from '@vercel/kv';
const kv = createClient({
	url: process.env.KV_URL,
	token: process.env.KV_TOKEN
});
export const createData = async({ key, value } : {key: string, value: any}) => {
	try{
		console.log(key, ' Miss');
		await kv.set(key, JSON.stringify(value), { ex: 500 });
	} catch(e) {
		throw e;
	}
};

export const fetchData = async({ key } : {key: string}) => {
	try{
		const data = await kv.get(key);
		if(data) {
			console.log(key, ' Hitt');
			return data;
		}
		return null;
	} catch(e) {
		throw e;
	}
};

export const cacheExtension = async({ model, operation, args, query } : any, { pivot } : {pivot?: string} = {}) => {
	if(process.env.SKIP_CACHING === 'yes') {
		console.log('Skipping caching');
		return query(args);
	}
	const pivotPoint = pivot ? args.where[pivot] ?? '' : '';

	const key = `${process.env.TOKEN_NAME}_${model}_${operation}_${JSON.stringify(args)}`;
	let data = null;
	const allow = await kv.sismember(`${process.env.TOKEN_NAME}_allow`, `${model}_${operation}_${pivotPoint}`);
	if(allow) {
		data = await fetchData({ key });
	}
	if(data && allow) {
		return data;
	} else {
		const data = await query(args);
		await createData({ key, value: data });
		await kv.sadd(`${process.env.TOKEN_NAME}_allow`, `${model}_${operation}_${pivotPoint}`);
		return data;
	}
};

export const cacheInvalidationExtension = async({ model, query, args } : any, { pivot }:{pivot?: string} = {}) => {
	if(process.env.SKIP_CACHING === 'yes') {
		console.log('Skipping caching');
		return query(args);
	}
	const pivotPoint = pivot ? args.data[pivot] ?? '' : '';

	console.log('Force Invalidating Cache');
	await kv.srem(`${process.env.TOKEN_NAME}_allow`, `${model}_findUnique_${pivotPoint}`, `${model}_findMany_${pivotPoint}`, `${model}_findUnique_`, `${model}_findMany_`);
	return query(args);
};

export default kv;