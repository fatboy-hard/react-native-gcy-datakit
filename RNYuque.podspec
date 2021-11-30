
Pod::Spec.new do |s|
  s.name         = "RNYuque"
  s.version      = "1.0.0"
  s.summary      = "RNYuque"
  s.description  = <<-DESC
                  rn yuque
                   DESC
  s.homepage     = "http://220.167.101.49:8092/fat_boy/YuQue"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "fatboy" => "fatboy_2020@163.com" }
  s.platform     = :ios, "11.0"
  s.source       = { :git => "git@github.com:fatboy-hard/react-native-yuque.git", :tag => "main" }
  #"ios/FTMobileSDK/**/*.{h,m}","ios/FTMobileSDK/FTMobileExtension/Info.{plist}"
  s.source_files  = "ios/RNYuque.{h,m}","sh}"
  s.requires_arc = true

  s.library = "resolv.9"
  s.dependency "React"
  s.dependency "FTMobileSDK", "1.2.6-alpha.2"

end

  