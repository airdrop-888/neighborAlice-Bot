const axios = require('axios');
const chalk = require('chalk');
const cfonts = require('cfonts');
const HttpProxyAgent = require('http-proxy-agent');
const SocksProxyAgent = require('socks-proxy-agent');
const readlineSync = require('readline-sync');
const fs = require('fs');

cfonts.say('Airdrop 888', {
  font: 'block',
  align: 'center',
  colors: ['yellow', 'magenta'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0',
});

console.log(chalk.green('Script coded by - @balveerxyz | Channel Tele: t.me/airdroplocked | Auto Task Neighbor Alice'));

const useProxy = readlineSync.question(chalk.yellow('Mau menggunakan proxy? (y/n) : ')).toLowerCase();

let agent = null;
if (useProxy === 'y') {
  const proxies = fs.readFileSync('proxy.txt', 'utf-8').trim().split('\n');
  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)].trim();
  agent = randomProxy.startsWith('socks5://') || randomProxy.startsWith('socks4://')
    ? new SocksProxyAgent(randomProxy)
    : new HttpProxyAgent(randomProxy);
  console.log(chalk.blue(`Using proxy: ${randomProxy} ✅`));
}

const tokens = fs.readFileSync('tokens.txt', 'utf-8').trim().split('\n');
const baseUrl = 'https://mkpl-api.prod.myneighboralice.com/api';

async function getUserProfile(token) {
  try {
    const config = {
      method: 'get',
      url: `${baseUrl}/users/0x0098628619755e12ed56e8b81a734b45339857de/profile`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: agent,
    };
    const response = await axios(config);
    const { nickName, wallet, socials } = response.data;
    console.log(chalk.cyan(`User Profile:`));
    console.log(chalk.cyan(`Nickname: ${nickName} 👤`));
    console.log(chalk.cyan(`Wallet: ${wallet} 💼`));
    console.log(chalk.cyan(`Socials:`));
    socials.forEach(social => {
      console.log(chalk.cyan(`- ${social.provider}: ${social.name} 🌐`));
    });
    return response.data;
  } catch (error) {
    console.log(chalk.red(`Error fetching user profile: ${error.message} 😞`));
    return null;
  }
}

async function getAvailableTasks(token) {
  try {
    const config = {
      method: 'get',
      url: `${baseUrl}/quests/user-event`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: agent,
    };
    const response = await axios(config);
    const tasks = response.data.quests;
    const availableTasks = tasks.filter(task => task.tracks.length === 0);
    console.log(chalk.yellow(`Available Tasks:`));
    availableTasks.forEach(task => {
      console.log(chalk.yellow(`- ID: ${task.id}, Title: ${task.title}, Points: ${task.points} 🎯`));
    });
    return availableTasks;
  } catch (error) {
    console.log(chalk.red(`Error fetching tasks: ${error.message} 😞`));
    return [];
  }
}

async function completeQuest(questId, token) {
  try {
    const config = {
      method: 'post',
      url: `${baseUrl}/quests/${questId}/complete`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        accountId: '00b5999cd20a9892a12594465c207584c952cc09fe8d23f5ea14877d99b2f879',
      },
      httpsAgent: agent,
    };
    const response = await axios(config);
    console.log(chalk.green(`Quest ${questId} completed! 🎉 Completed count: ${response.data.completedCount}`));
    return true;
  } catch (error) {
    console.log(chalk.red(`Error completing quest ${questId}: ${error.message} 😞`));
    return false;
  }
}

async function run() {
  for (const token of tokens) {
    console.log(chalk.cyan(`Processing token: ${token.slice(0, 10)}...`));
    
    // Step 1: Display user profile
    const profile = await getUserProfile(token);
    if (!profile) {
      console.log(chalk.red(`Skipping token due to profile fetch failure 😞`));
      continue;
    }
    
    // Step 2: Check available tasks
    const availableTasks = await getAvailableTasks(token);
    if (availableTasks.length === 0) {
      console.log(chalk.yellow(`No available tasks for this token 📭`));
      continue;
    }
    
    // Step 3: Complete available tasks
    for (const task of availableTasks) {
      await completeQuest(task.id, token);
      // Random delay between 2-3 seconds to avoid rate limiting
      const delay = Math.floor(Math.random() * 1000) + 2000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  console.log(chalk.magenta('All tasks processed! 🌟'));
}

run();