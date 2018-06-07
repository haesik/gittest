
/* Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var mqtt = require('mqtt');
var assert = require('assert');

var pubClientOpts = {
  clientId: 'iotjs-mqtt-test-pub',
//  host: 'test.mosquitto.org',
//  host: 'localhost',
  host: 'ec2-13-125-245-19.ap-northeast-2.compute.amazonaws.com',
  port: 1883,
  keepalive: 30,
};
var pubOpts = {
  topic: 'iotjs/gitupdate',
  message: "{add: aaa.js}",
  qos: 1,
};

var pubClient = mqtt.connect(pubClientOpts);

pubClient.publish(pubOpts);
pubClient.end();
