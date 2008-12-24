require "#{File.dirname __FILE__}/lib/growl"
ActionView::Base.send(:include, ActionView::Helpers::Growl4RailsHelper)