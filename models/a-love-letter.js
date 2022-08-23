const axios = require('axios');
const dayjs = require('dayjs');

/** @name 公众号appId */
const appId = 'wx3138af1a3a1f790e';
/** @name 公众号appSecret */
const appSecret = 'f2ae5e07202ccb4c96c720cd28e8840f';
/** @name 微信api，请求accessToken地址 */
const wxTokenApiUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
/** @name 发送消息api */
const wxSendApiUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send';
/**  @name 恋爱日期2022-02-13 */
const loveDay = dayjs('2022-02-13');
/** @name 天气api */
const weatherApi = 'https://api.tianapi.com/tianqi/index?key=3dfdc6505fab1404997a851e308ae2b2&city=%E5%8C%97%E4%BA%AC%E5%B8%82'
/** @name 情书api */
const letterApi = 'https://api.tianapi.com/caihongpi/index?key=3dfdc6505fab1404997a851e308ae2b2';
/** @name 女朋友openId */
const openId = 'oLQCw6u6ZJ_F2sv7YieWusYNvko4';
/** @name 我openId */
const openId_i = 'oLQCw6hW8jaMyBbZorZiRLqUy3y0';

const aLoveLetter = async () => {
  const day = dayjs().diff(loveDay, 'day') + 1;
  const accessToken = (await axios.get(wxTokenApiUrl)).data.access_token;
  const weather = (await axios.get(weatherApi)).data.newslist[0];
  const letter = (await axios.get(letterApi)).data.newslist[0].content;
  await axios.post(wxSendApiUrl, {
    touser: openId_i,
    template_id: 'K9ZGN_cHtdSVBghyIIhvKJ6-RKJtUD25to3It1Yhw_U',
    data: {
      title: {
        value: `${dayjs().format('YYYY年MM月DD日')} ${weather.week}`
      },
      weather: {
        value: weather.weather
      },
      weather1: {
        value: weather.lowest
      },
      weather2: {
        value: weather.highest
      },
      weather3: {
        value: weather.tips
      },
      loveday: {
        value: `${day}天`,
      },
      letter: {
        value: `${letter}        `,
        color: '#bb0000'
      }
    }
  }, {
    params: {
      access_token: accessToken
    }
  })
  await axios.post(wxSendApiUrl, {
    touser: openId,
    template_id: 'K9ZGN_cHtdSVBghyIIhvKJ6-RKJtUD25to3It1Yhw_U',
    data: {
      title: {
        value: `${dayjs().format('YYYY年MM月DD日')} ${weather.week}`
      },
      weather: {
        value: weather.weather
      },
      weather1: {
        value: weather.lowest
      },
      weather2: {
        value: weather.highest
      },
      weather3: {
        value: weather.tips
      },
      loveday: {
        value: `${day}天`,
      },
      letter: {
        value: `${letter}        `,
        color: '#bb0000'
      }
    }
  }, {
    params: {
      access_token: accessToken
    }
  })
  console.log(day, accessToken, weather, letter );
}

module.exports = aLoveLetter;