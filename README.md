
# react-native-yuque

## Getting started

`$ npm install react-native-gcy-datakit --save`



### Manual installation


#### iOS

1. In Project and cd ios and pod install 


#### Android

1. Append the following lines to `android/build.gradle`:
  	 allprojects {
      repositories {
       ##省略其他代码
        maven {
            url 'https://mvnrepo.jiagouyun.com/repository/maven-releases'
        }
    }
}




## Usage
```javascript
import RNYuque from 'react-native-gcy-datakit';

// TODO: What to do with the module?
RNYuque;
```
  
