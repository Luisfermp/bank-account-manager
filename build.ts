// eslint-disable-next-line import/no-extraneous-dependencies
import s from 'shelljs';
import config from './tsconfig.json';

const { outDir } = config.compilerOptions;

s.rm('-rf', 'dis');
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/common`);
s.cp('./server/common/bank-account-manager-api.yml', `${outDir}/common/bank-account-manager-api.yml`);
