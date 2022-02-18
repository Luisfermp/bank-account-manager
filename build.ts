// eslint-disable-next-line import/no-extraneous-dependencies
import s from 'shelljs';
import config from './tsconfig.json';

const { outDir } = config.compilerOptions;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('.spec/bank-account-manager-api.yml', `${outDir}/.spec/bank-account-manager-api.yml`);
