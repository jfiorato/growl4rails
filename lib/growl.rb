module ActionView::Helpers
  module Growl4RailsHelper
    
    # Add this to your layout
    # <%= growl4rails_includes %> or
    # <%= growl4rails_includes(5000, 5) %> 
    def growl4rails_includes(duration = 5000, max_showing = 3)
      javascript_tag("var growl4rails_duration = #{duration}; var growl4rails_max_showing = #{max_showing};") + "\n" +
      javascript_include_tag("#{asset_path}growl4rails.js") + "\n" +
      stylesheet_link_tag("#{asset_path}growl4rails.css") + "\n" +
      "<!--[if lt IE 7]>\n" +
      stylesheet_link_tag("#{asset_path}growl4rails_ie6.css") + "\n" +
      "<![endif]-->"

    end
    
    def asset_path
      "growl4rails/"
    end
  end
end