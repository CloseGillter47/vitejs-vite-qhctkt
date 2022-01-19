import { loadEnv, PluginOption } from 'vite';
// import { resolve } from 'path';

// const _loadEnv = (envPath = '.env') => {
//   const envFilePath = resolve(process.cwd(), envPath);
//   try {
//     let res = {};

//     if (!fs.existsSync(envFilePath)) return {};

//     const data = fs.readFileSync(envFilePath, 'utf8');

//     data.split('\n').forEach((kv) => {
//       const [k, ...values] = kv.split('=');
//       const key = k.replace(/\s+/g, '');
//       const value = values.join('=').trim();

//       if (key) {
//         res[key] = value;
//       }
//     });

//     return res;
//   } catch (err) {
//     console.error(err);
//   }
// };

// const _getModeEnvPath = () => {
//   const argvList = process.argv.slice(2);
//   const modeIndex = argvList.findIndex(
//     (arg) => arg === '-m' || arg === '--mode'
//   );
//   const modeFuzzyIndex = argvList.findIndex(
//     (arg) => arg.indexOf('-m') > -1 || arg.indexOf('--mode') > -1
//   );

//   if (
//     modeIndex !== -1 &&
//     modeIndex === modeFuzzyIndex &&
//     !!argvList[modeIndex + 1] // both null vs empty
//   )
//     return `.env.${argvList[modeIndex + 1]}`;

//   if (modeFuzzyIndex !== -1 && !!argvList[modeFuzzyIndex])
//     return `.env.${argvList[modeFuzzyIndex].split('=')[1]}`;
// };

// const modeEnvPath = _getModeEnvPath();
// const envConfig = Object.assign(
//   {},
//   _loadEnv('.env'),
//   !!modeEnvPath && _loadEnv(modeEnvPath)
// );

export default (config?: Record<string, unknown>): PluginOption => {
  return {
    name: 'vite-plugin-super-html',
    transformIndexHtml(html, ctx) {
      const values: Record<string, unknown> = {};
      // Use the loadEnv method provided by vite, because the code checks that it is a dev environment
      if (ctx.server) {
        const envs = loadEnv(ctx.server.config.mode, process.cwd()) || {};
        Object.assign(values, envs);
      }

      return html.replace(/%\s+(\w+)\s+%/g, (match, key) => `${values[key]}`);
    },
  };
};
