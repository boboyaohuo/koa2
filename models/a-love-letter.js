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
/** @name 早安api */
const goodMorningApi = 'https://api.tianapi.com/zaoan/index?key=3dfdc6505fab1404997a851e308ae2b2'
/** @name 日历api */
const calendarApi = `https://api.tianapi.com/jiejiari/index?key=3dfdc6505fab1404997a851e308ae2b2&date=${dayjs().format('YYYY-MM-DD')}&mode=1`;
/** @name 情书api */
const letterApi = 'https://api.tianapi.com/caihongpi/index?key=3dfdc6505fab1404997a851e308ae2b2';
/** @name 消息模版id */
const templateId = 'abda0htYXVpkQ8ObjEsH4B3huhPSFCB1YdwQl32rfy8';
/** @name 女朋友openId */
const openId = 'oLQCw6u6ZJ_F2sv7YieWusYNvko4';
/** @name 我openId */
const openId_i = 'oLQCw6hW8jaMyBbZorZiRLqUy3y0';

const aLoveLetter = async () => {
  const day = dayjs().diff(loveDay, 'day') + 1;
  const accessToken = (await axios.get(wxTokenApiUrl)).data.access_token;
  const weather = (await axios.get(weatherApi)).data.newslist[0];
  const goodMorning = (await axios.get(goodMorningApi)).data.newslist[0].content;
  const calendar = (await axios.get(calendarApi)).data.newslist[0];
  const letter = (await axios.get(letterApi)).data.newslist[0].content;
  const holiday = goodMorning;

  if (dayjs().month() == 1 && dayjs().date() === 13) {
    // 2月13日周年几年
    holiday = `在一起${dayjs().diff(loveDay, 'year')}周年快乐！！！`
  } else if (calendar.lunarmonth === '十月' && calendar.lunarday === '初二') {
    // 缘缘生日
    holiday = '缘缘，生日快乐！！！'
  } else if (calendar.lunarmonth === '四月' && calendar.lunarday === '廿九') {
    // 波波生日
    holiday = '波波，生日快乐！！！'
  } else if (calendar.name) {
    // 节日
    holiday = `${calendar.name}快乐！！${calendar.tip}`
  };
  // 发送消息方法
  const sendMsg = async (openId) => {
    const res = await axios.post(wxSendApiUrl, {
      touser: openId,
      template_id: templateId,
      data: {
        title: {
          value: `${dayjs().format('YYYY年MM月DD日')} ${weather.week}`
        },
        weather: {
          value: weather.weather
        },
        weather1: {
          value: weather.lowest,
        },
        weather2: {
          value: weather.highest,
        },
        weather3: {
          value: `${weather.tips.split('。')[0]}。`
        },
        loveday: {
          value: `${day}天`,
        },
        holiday: {
          value: `${holiday}       `,
          color: '#8C0909'
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
    return res.data.errmsg;
  }
  const result = await Promise.all([openId_i, openId].map(item => sendMsg(item)));
  console.log(dayjs().format('YYYY年MM月DD日'), result);
}

module.exports = aLoveLetter;